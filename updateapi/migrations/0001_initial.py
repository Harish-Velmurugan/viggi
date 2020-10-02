# Generated by Django 3.0.6 on 2020-10-02 19:11

from django.db import migrations, models
import django_mysql.models
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='bids',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pid', models.IntegerField()),
                ('sid', models.IntegerField()),
                ('uid', models.IntegerField()),
                ('bids', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='CompanyApl',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('code', models.IntegerField(blank=True, null=True)),
                ('location', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='ExpertHelp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('experts', django_mysql.models.ListTextField(models.IntegerField(), blank=True, size=None)),
                ('choice', models.CharField(max_length=50)),
                ('problem', models.IntegerField(default=0)),
                ('payment', models.IntegerField(default=200)),
                ('bucket', models.CharField(max_length=70)),
                ('chat', models.CharField(max_length=70)),
                ('completed', models.BooleanField(default=False)),
                ('domains', django_mysql.models.ListCharField(models.CharField(max_length=50), blank=True, max_length=1000, size=10)),
            ],
        ),
        migrations.CreateModel(
            name='ExpertPanel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bucket', models.CharField(max_length=70)),
                ('problem', models.BooleanField(default=False)),
                ('remarks', models.IntegerField(default=5)),
                ('solution', models.BooleanField(default=False)),
                ('domains', django_mysql.models.ListCharField(models.CharField(max_length=50), max_length=1000, size=10)),
            ],
        ),
        migrations.CreateModel(
            name='User_Personal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=50)),
                ('lastname', models.CharField(blank=True, max_length=50, null=True)),
                ('gender', models.CharField(choices=[('Large', 'Large'), ('FeLarge', 'FeLarge'), ('Other', 'Other')], default='M', max_length=10, null=True)),
                ('dob', models.DateField(auto_now_add=True, null=True)),
                ('nationality', models.CharField(max_length=50, null=True)),
                ('phone', phonenumber_field.modelfields.PhoneNumberField(max_length=128, null=True, region=None)),
                ('img', models.ImageField(upload_to='uploads/')),
                ('pin', models.IntegerField(blank=True, null=True)),
                ('location', models.CharField(max_length=50, null=True)),
                ('strength', models.CharField(max_length=50, null=True)),
                ('domains', models.CharField(max_length=250, null=True, verbose_name=django_mysql.models.ListCharField(models.CharField(max_length=50), max_length=105, null=True, size=5))),
                ('displaydomains', models.CharField(max_length=250, null=True, verbose_name=django_mysql.models.ListCharField(models.CharField(max_length=50), max_length=105, null=True, size=5))),
            ],
        ),
        migrations.CreateModel(
            name='User_Professional',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qualification', models.CharField(blank=True, max_length=50, null=True)),
                ('specialization', models.CharField(blank=True, max_length=50, null=True)),
                ('domains', models.CharField(blank=True, max_length=250, null=True, verbose_name=django_mysql.models.ListCharField(models.CharField(max_length=50), blank=True, max_length=105, null=True, size=5))),
                ('displaydomains', models.CharField(blank=True, max_length=250, null=True, verbose_name=django_mysql.models.ListCharField(models.CharField(max_length=50), blank=True, max_length=105, null=True, size=5))),
                ('work_exp', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User_Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(default='user', max_length=20)),
                ('problems_interested', django_mysql.models.ListTextField(models.IntegerField(), blank=True, size=None)),
                ('subscribedChannels', django_mysql.models.ListTextField(models.IntegerField(), blank=True, size=None)),
                ('rp', models.IntegerField(default=100)),
                ('notifyCount', models.IntegerField(default=0)),
                ('fashion', models.BooleanField(default=False)),
                ('fmcg', models.BooleanField(default=False)),
                ('healthcare', models.BooleanField(default=False)),
                ('finance', models.BooleanField(default=False)),
                ('tt', models.BooleanField(default=False)),
                ('edu', models.BooleanField(default=False)),
                ('power', models.BooleanField(default=False)),
                ('med_ent', models.BooleanField(default=False)),
                ('sw', models.BooleanField(default=False)),
                ('hw', models.BooleanField(default=False)),
                ('infrastructure', models.BooleanField(default=False)),
                ('agriculture', models.BooleanField(default=False)),
                ('automobiles', models.BooleanField(default=False)),
                ('textile', models.BooleanField(default=False)),
                ('e_commerce', models.BooleanField(default=False)),
                ('art_sports', models.BooleanField(default=False)),
                ('gem', models.BooleanField(default=False)),
                ('pharmaceuticals', models.BooleanField(default=False)),
                ('railways', models.BooleanField(default=False)),
                ('food', models.BooleanField(default=False)),
                ('sci', models.BooleanField(default=False)),
                ('law', models.BooleanField(default=False)),
                ('trade', models.BooleanField(default=False)),
                ('climate', models.BooleanField(default=False)),
                ('security', models.BooleanField(default=False)),
                ('eco_friendly', models.BooleanField(default=False)),
                ('jack', models.BooleanField(default=False)),
                ('striker', models.BooleanField(default=False)),
                ('astute', models.BooleanField(default=False)),
                ('omnipotent', models.BooleanField(default=False)),
                ('salvo', models.BooleanField(default=False)),
                ('maestro', models.BooleanField(default=False)),
                ('hattricker', models.BooleanField(default=False)),
                ('alpha', models.BooleanField(default=False)),
                ('commando', models.BooleanField(default=False)),
                ('solver', models.BooleanField(default=False)),
                ('seeker', models.BooleanField(default=False)),
                ('comrade', models.BooleanField(default=False)),
                ('hatrick', models.IntegerField(default=0)),
                ('ast', models.IntegerField(default=0)),
                ('level', models.CharField(default='Bronze', max_length=12)),
            ],
        ),
    ]