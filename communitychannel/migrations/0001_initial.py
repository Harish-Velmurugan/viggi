# Generated by Django 3.0.6 on 2020-10-03 09:45

from django.db import migrations, models
import django_mysql.models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CommunityChat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('body', models.TextField()),
                ('channelId', models.CharField(max_length=85)),
                ('profileImg', models.CharField(default='', max_length=200)),
                ('img', models.ImageField(blank='true', null='true', upload_to='communityChatImg/')),
                ('likes', django_mysql.models.ListTextField(models.IntegerField(), blank=True, size=None)),
            ],
        ),
        migrations.CreateModel(
            name='CommunityList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('communityName', models.CharField(max_length=25)),
                ('communityDescription', models.TextField()),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('img', models.ImageField(upload_to='communityImg/')),
                ('usersUnapproved', django_mysql.models.ListTextField(models.IntegerField(), blank=True, size=None)),
                ('usersApproved', django_mysql.models.ListTextField(models.IntegerField(), blank=True, size=None)),
            ],
        ),
        migrations.CreateModel(
            name='PostComments',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('problemId', models.CharField(max_length=15)),
                ('username', models.CharField(max_length=15)),
                ('name', models.CharField(max_length=30)),
                ('body', models.CharField(max_length=500)),
                ('profileImage', models.CharField(max_length=200)),
                ('date', models.CharField(default='', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='ReplyComments',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('commentId', models.CharField(max_length=40)),
                ('username', models.CharField(max_length=15)),
                ('name', models.CharField(max_length=30)),
                ('body', models.CharField(max_length=500)),
                ('profileImage', models.CharField(max_length=200)),
                ('date', models.CharField(default='', max_length=50)),
            ],
        ),
    ]
