# Generated by Django 3.0.6 on 2020-10-02 19:11

import cloudinary_storage.storage
from django.db import migrations, models
import django_mysql.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ForumAnswer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('keyword', models.CharField(max_length=15)),
                ('buckets', models.CharField(max_length=15)),
                ('msg', models.CharField(max_length=500)),
                ('citaton_abt', models.CharField(max_length=15, null=True)),
                ('citation', models.CharField(max_length=200, null=True)),
                ('upvoters', django_mysql.models.ListTextField(models.IntegerField(), blank=True, size=5)),
                ('upvotes', models.IntegerField(default=0)),
                ('downvoters', django_mysql.models.ListTextField(models.IntegerField(), blank=True, size=5)),
                ('downvotes', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='ForumPost',
            fields=[
                ('postId', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=50)),
                ('desc', models.CharField(max_length=500)),
                ('posteddate', models.DateTimeField(auto_now_add=True)),
                ('img', models.ImageField(upload_to='problem_images')),
                ('budget', models.CharField(max_length=500)),
                ('ans_count', models.IntegerField(default=0)),
                ('files', models.FileField(storage=cloudinary_storage.storage.RawMediaCloudinaryStorage(), upload_to='file')),
                ('buckets', models.CharField(max_length=100)),
                ('refined', models.BooleanField(default=False)),
            ],
        ),
    ]
