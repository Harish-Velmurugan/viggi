# Generated by Django 3.0.6 on 2020-10-02 19:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('smartcontract', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('post', '0002_auto_20201003_0041'),
        ('solutions', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='solverdescription',
            name='username',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='solvercontract',
            name='problem',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='post.Post'),
        ),
        migrations.AddField(
            model_name='solvercontract',
            name='solution',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='solutions.Solution'),
        ),
        migrations.AddField(
            model_name='description',
            name='contract',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='smartcontract.Contract'),
        ),
        migrations.AddField(
            model_name='description',
            name='solution',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='solutions.Solution'),
        ),
        migrations.AddField(
            model_name='description',
            name='username',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='contract',
            name='problem',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='post.Post'),
        ),
    ]
