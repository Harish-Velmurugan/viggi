# Generated by Django 3.0.6 on 2020-10-02 19:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('prototypetest', '0002_createprototypetest_solutionid'),
        ('chat', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('updateapi', '0001_initial'),
        ('solutions', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='author_messages', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='message',
            name='room',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='chat.ChatRoom'),
        ),
        migrations.AddField(
            model_name='chatroom',
            name='Solutionid',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='solutions.Solution'),
        ),
        migrations.AddField(
            model_name='chatroom',
            name='expertHelp',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='updateapi.ExpertHelp'),
        ),
        migrations.AddField(
            model_name='chatroom',
            name='prototypeTest',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='prototypetest.createPrototypeTest'),
        ),
    ]