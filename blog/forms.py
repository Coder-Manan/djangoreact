from socket import fromshare
from typing_extensions import Required
from django import forms

class BlogForm(forms.Form):
    sno = forms.IntegerField(required=True)
    name = forms.CharField(required=True)
    title = forms.CharField(required=True)
    content = forms.CharField(required=True)