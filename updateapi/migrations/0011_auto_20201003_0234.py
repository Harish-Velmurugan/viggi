# Generated by Django 3.0.6 on 2020-10-02 21:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('updateapi', '0010_auto_20201003_0233'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user_personal',
            name='gender',
            field=models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], default='M', max_length=10, null=True),
        ),
    ]
