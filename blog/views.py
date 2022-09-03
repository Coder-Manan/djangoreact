from django.http import HttpResponse
from blog.models import blog
from .serializer import BlogSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
import json
from Crypto.Hash import SHA256
from django.core import serializers
# Create your views here.

def index(request):
    user = request.COOKIES.get('user')
    password = request.COOKIES.get('pwd')
    loggedin = request.COOKIES.get('loggedin')
    if user == "admin" and password == SHA256.new(b"admin").hexdigest() and loggedin == "true":
        response = HttpResponse(json.dumps({"status": "loggedin"}))
        return response
    response = HttpResponse()
    response.set_cookie('user', None)
    response.set_cookie('pwd', None)
    response.set_cookie('loggedin', None)
    return response

@api_view(['POST'])
def addblog(request):
    data = json.dumps(request.data)
    if ('username' not in data) or ('password' not in data):
        return HttpResponse("Please enter username and password")
    blogdata = BlogSerializer(data = request.data)
    data = json.loads(data)
    user = data['username']
    pwd = data['password']
    if user == "admin" and pwd == SHA256.new(b"admin").hexdigest():
        if blogdata.is_valid():
            blogdata.save()
            return HttpResponse("Blog added successfully")
        else:
            return HttpResponse("Invalid data")
    
    return HttpResponse("Wrong username or password")

@api_view(['POST'])
def login(request):
    data = json.loads(request.body)
    print(data)
    if ('username' not in data) or ('password' not in data):
        return HttpResponse("Please enter username and password")
    user = data['username']
    pwd = data['password']
    if user == "admin" and pwd == SHA256.new(b"admin").hexdigest():
        response = HttpResponse(json.dumps({"status": "loggedin", "user": user, "password": pwd}))
        response.set_cookie('user', user)
        response.set_cookie('pwd', pwd)
        response.set_cookie('loggedin', 'true')
        return response
    return HttpResponse(json.dumps({"status": "failed"}))

@api_view(['GET'])
# @permission_classes([AllowAny])
def getblogs(request):
    qs = blog.objects.all()
    qs_json = serializers.serialize('json', qs)
    print(qs_json)
    return HttpResponse(qs_json, content_type='application/json')
    # data = json.dumps(request.data)
    # data = json.loads(data)
    # user = data['username']
    # pwd = data['password']
    # if user != "admin" or pwd == SHA256.new(b"admin").hexdigest():
    #     response = HttpResponse(status=401)
    #     return response
    blogs = blog.objects.all()
    print(blogs)
    return HttpResponse(json.dumps(blogs), status=200)