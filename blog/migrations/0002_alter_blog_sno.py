# Generated by Django 3.2.15 on 2022-08-28 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='sno',
            field=models.AutoField(default=1, primary_key=True, serialize=False),
        ),
    ]
