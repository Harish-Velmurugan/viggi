# Generated by Django 3.0.6 on 2020-10-02 21:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0007_auto_20201003_0229'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='deadline',
            field=models.DateTimeField(default=datetime.datetime(2020, 10, 3, 2, 31, 43, 567497)),
        ),
    ]
