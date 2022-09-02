from os import stat
from urllib import response
from django.http import HttpResponse
from blog.models import blog
from .serializer import BlogSerializer
from rest_framework.decorators import api_view
import json
from Crypto.Hash import SHA256
# Create your views here.

def index(request):
    user = request.COOKIES.get('user')
    password = request.COOKIES.get('pwd')
    loggedin = request.COOKIES.get('loggedin')
    if user == "admin" and password == SHA256.new("admin").hexdigest() and loggedin == "true":
        response = HttpResponse(json.dumps({"status": "loggedin"}))
        return response
    response = HttpResponse()
    response.set_cookie('user', None)
    response.set_cookie('pwd', None)
    response.set_cookie('loggedin', None)
    return response

@api_view(['POST'])
def addblog(request):
    # if request.method == "POST":
    data = json.dumps(request.data)
    if ('username' not in data) or ('password' not in data):
        return HttpResponse("Please enter username and password")
    blogdata = BlogSerializer(data = request.data)
    data = json.loads(data)
    user = data['username']
    pwd = data['password']
    if user == "admin" and pwd == SHA256.new("admin").hexdigest():
        if blogdata.is_valid():
            blogdata.save()
            return HttpResponse("Blog added successfully")
        else:
            return HttpResponse("Invalid data")
    
    return HttpResponse("Wrong username or password")

@api_view(['POST'])
def login(request):
    data = json.dumps(request.data)
    if ('username' not in data) or ('password' not in data):
        return HttpResponse("Please enter username and password")
    data = json.loads(data)
    user = data['username']
    pwd = data['password']
    if user == "admin" and pwd == SHA256.new("admin").hexdigest():
        response = HttpResponse(json.dumps({"status": "loggedin"}))
        response.set_cookie('user', user)
        response.set_cookie('pwd', SHA256.new(pwd).hexdigest())
        response.set_cookie('loggedin', 'true')
        return response    

@api_view(['GET'])
def getblogs(request):
    data = json.dumps(request.data)
    data = json.loads(data)
    user = data['username']
    pwd = data['password']
    if user != "admin" or pwd == SHA256.new("admin").hexdigest():
        response = HttpResponse(status=401)
        response.set_cookie('user', None)
        response.set_cookie('pwd', None)
        response.set_cookie('loggedin', None)
        return response
    blogs = blog.objects.all()
    serializer = BlogSerializer(blogs, many=True)
    return HttpResponse(json.dumps(serializer.data), status=200)