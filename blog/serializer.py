from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from django.db import models

# from django.core import serializers
from .models import blog
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = blog
        fields = '__all__'

    def create(self, validated_data):
        x=blog.objects.create(
            name=validated_data['name'],
            title=validated_data['title'],
            content=validated_data['content']
        )
        blog.save(x)
        return x

