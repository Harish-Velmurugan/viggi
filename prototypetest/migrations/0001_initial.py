# Generated by Django 3.0.6 on 2020-10-02 19:11

import cloudinary_storage.storage
from django.db import migrations, models
import django.db.models.deletion
import django_mysql.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='createPrototypeTest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pBuilder', models.IntegerField()),
                ('pImplementer', models.IntegerField()),
                ('started', models.BooleanField(default=False)),
                ('members', models.CharField(blank=True, max_length=500, verbose_name=django_mysql.models.ListTextField(models.CharField(max_length=100), size=5))),
                ('step', models.IntegerField(default=0)),
                ('completed', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Implementation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('currentStep', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Steps',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stepName', models.TextField()),
                ('pBuilderAgree', models.BooleanField(default=False)),
                ('pImplementerAgree', models.BooleanField(default=False)),
                ('pImplementerDoc', models.FileField(blank=True, null=True, storage=cloudinary_storage.storage.RawMediaCloudinaryStorage(), upload_to='prototypeImplementationpBuilder')),
                ('pBuilderDoc', models.FileField(blank=True, null=True, storage=cloudinary_storage.storage.RawMediaCloudinaryStorage(), upload_to='prototypeImplementationpImplementer')),
                ('person', models.IntegerField()),
                ('stepNo', models.IntegerField()),
                ('ImplementationId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='prototypetest.Implementation')),
            ],
        ),
        migrations.CreateModel(
            name='prototypeSubmission',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prototypeDesc', models.TextField()),
                ('prototypeDoc', models.FileField(null=True, storage=cloudinary_storage.storage.RawMediaCloudinaryStorage(), upload_to='prototype')),
                ('steps', django_mysql.models.ListTextField(models.CharField(max_length=1000), blank=True, max_length=22000, null=True, size=20)),
                ('person', django_mysql.models.ListTextField(models.CharField(max_length=1000), blank=True, max_length=22000, null=True, size=20)),
                ('pImplementerAgree', models.BooleanField(default=False)),
                ('prototypeTestId', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='prototypetest.createPrototypeTest')),
            ],
        ),
        migrations.CreateModel(
            name='planning',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('budget', models.IntegerField()),
                ('time', models.IntegerField()),
                ('desc', models.TextField()),
                ('sustainability', models.TextField()),
                ('risk', models.TextField()),
                ('ios', models.TextField()),
                ('pImplementerAgree', models.BooleanField(default=False)),
                ('prototypeTestId', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='prototypetest.createPrototypeTest')),
            ],
        ),
        migrations.AddField(
            model_name='implementation',
            name='prototypeTestId',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='prototypetest.prototypeSubmission'),
        ),
    ]