# Generated by Django 3.0.6 on 2020-10-02 20:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('updateapi', '0006_auto_20201003_0220'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user_personal',
            name='img',
        ),
    ]
