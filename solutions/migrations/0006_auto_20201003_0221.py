# Generated by Django 3.0.6 on 2020-10-02 20:51

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('solutions', '0005_auto_20201003_0220'),
    ]

    operations = [
        migrations.AlterField(
            model_name='createsurvey',
            name='deadline',
            field=models.DateTimeField(default=datetime.datetime(2020, 10, 3, 2, 21, 53, 275806)),
        ),
    ]
