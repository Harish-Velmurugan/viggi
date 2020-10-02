from rest_framework import serializers
from .models import User_Professional,User_Personal,bids,User_Profile,ExpertPanel,ExpertHelp,CompanyApl

class user_professional_serializer(serializers.ModelSerializer):

    class Meta:
        model = User_Professional
        fields = '__all__'

class user_personal_serializer(serializers.ModelSerializer):

    class Meta:
        model = User_Personal
        fields = '__all__'

class bids_serializer(serializers.ModelSerializer):

    class Meta:
        model = bids
        fields = '__all__'


class user_profile_serializer(serializers.ModelSerializer):

    class Meta:
        model = User_Profile
        fields = '__all__'


class ExpertPanelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ExpertPanel
        fields = '__all__'


class ExpertHelpSerializer(serializers.ModelSerializer):

    class Meta:
        model = ExpertHelp
        fields = '__all__'

class companyapl_serializer(serializers.ModelSerializer):

    class Meta:
        model = CompanyApl
        fields = '__all__'

