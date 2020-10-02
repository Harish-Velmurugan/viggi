from rest_auth.serializers import LoginSerializer as RestAuthLoginSerializer
from rest_framework import serializers
#from django.db import models
from users import models
from rest_framework.authtoken.models import Token
from rest_auth.serializers import PasswordResetSerializer
from allauth.account.forms import ResetPasswordForm
from users.models import CustomUser


class PasswordSerializer(PasswordResetSerializer):
    password_reset_form_class = ResetPasswordForm


class LoginSerializer(RestAuthLoginSerializer):
    username = None

    class Meta:
        model = Token
        fields = ('key', 'user')


class TokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = Token
        fields = ('key', 'user')


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'email')
