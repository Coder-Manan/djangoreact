# Generated by Django 3.2.15 on 2022-08-28 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_alter_blog_sno'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='title',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]