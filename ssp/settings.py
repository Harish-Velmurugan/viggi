"""
Django settings for ssp project.

Generated by 'django-admin startproject' using Django 3.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""
import django_heroku
import os


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '=6mj%)$h9o9c#px+*80#150=0az(qv*xxlgwzjsd%3ujb3n3fz'

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = True

# ALLOWED_HOSTS = []

DEBUG = os.environ.get('DEBUG', True)

ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'solutions',
    'users',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',
    'django_rest_passwordreset',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'rest_auth.registration',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'updateapi',
    'phonenumber_field',
    'django_extensions',
    'corsheaders',
    'drf_multiple_model',
    'post',
    'dashboard',
    'searchapi',
    "django_apscheduler",
    'smartcontract',
    'api',
    'notifications',
    'lor',
    'channels',
    'wiki',
    'forum',
    'comments',
    'chat',
    'background_task',
    "monitorsolution",
    'cloudinary_storage',
    'cloudinary',
    'communitychannel',

    'helper',

    # 'django_celery_beat',


    'prototypetest',

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'ssp.urls'


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR)],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ssp.wsgi.application'
ASGI_APPLICATION = 'ssp.routing.application'

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        'CONN_MAX_AGE': 500
    }
}

DATE_INPUT_FORMATS = ('%d-%m-%Y', '%Y-%m-%d')

USE_I18N = True
USE_L10N = True

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

REST_FRAMEWORK = {

    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        # 'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        # 'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
        # 'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],

    'DATE_INPUT_FORMATS': ['iso-8601', '%m/%d/%Y'],
}


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'

# STATIC_URL = '/static/'
STATICFILES_STORAGE = 'cloudinary_storage.storage.StaticHashedCloudinaryStorage'

AUTH_USER_MODEL = 'users.CustomUser'

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

SITE_ID = 1


EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'rinnovations0@gmail.com'  # emailid
EMAIL_HOST_PASSWORD = 'asdf@123'  # password
EMAIL_PORT = 587
EMAIL_USE_TLS = True


AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
)
REST_AUTH_SERIALIZERS = {'LOGIN_SERIALIZER': 'users.api.serializers.LoginSerializer',
                         'TOKEN_SERIALIZER': 'users.api.serializers.TokenSerializer',
                         'PASSWORD_RESET_SERIALIZER': 'users.api.serializers.PasswordSerializer',

                         }

ACCOUNT_AUTHENTICATION_METHOD = 'email'  # email

ACCOUNT_EMAIL_REQUIRED = True
#ACCOUNT_EMAIL_VERIFICATION = 'none'


LOGIN_REDIRECT_URL = '/'

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        }
    }
}

MEDIA_URL = '/'
MEDIA_ROOT = os.path.join((BASE_DIR), "media")
CORS_ORIGIN_ALLOW_ALL = True


DJANGO_NOTIFICATIONS_CONFIG = {'USE_JSONFIELD': True}

# CHANNEL_LAYERS = {
#     "default": {
#         "BACKEND": "channels.layers.InMemoryChannelLayer"

#     }
# }

CHANNEL_LAYERS = {

    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [os.environ.get('REDIS_URL', 'redis://localhost:6379')],


            # 'hosts' : [('', 6379)],
            # "hosts": ['redis://h:p411c4e16a552e61b2300d4f088031cda15230dacf8dcb22b585e85cd7fe9e488@ec2-54-88-178-91.compute-1.amazonaws.com:19459'],
        }
    }
}


STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "build", "static"),  # update the STATICFILES_DIRS
)
# django_heroku.settings(locals())

REACT_ROUTES = [
    'dashboard',
    'dashboard/postproblem',
    'dashboard/ProblemInvolved',
    'dashboard/ProblemPosted',
    'dashboard/ExpiredProblem',
    'dashboard/Trending',
    'dashboard/helpers',
    'dashboard/expertDashboard',
    'dashboard/expertpost',
    'dashboard/request',
    'dashboard/solPrototypeImplementor',
    'dashboard/solPrototypeInitial',
    'dashboard/solPrototypeDb',
    'Nav',
    '',
    'signin',
    'signup',
    'update',
    'myprofile',
    'abstract',
    'feed',
    'viewsolution',
    'extenddays',
    'selectedsolution',
    'collaborate',
    'solverContract',
    'seekerContract',
    'seekerRevenueSplit',
    'submitsolution',
    'search',
    'test',
    'table',
    'prblmdesc',
    'topsolver',
    'solver',
    'solver1',
    'wallet',
    'problemdetails',
    'logout',
    'forgotpassword',
    'contract',
    'solcontract',
    'tc',
    'walletdashboard',
    'pay',
    'bid',
    'reputation-points',
    'addfunds',
    'walletforgotPassword',
    'try',
    'withdrawfunds',
    'walletpay',
    'notify',
    'chat',
    'dashboard/solutionedit',
    'extenddays',
    'profile',
    'solverRevenueSplit',
    'solverCollaborationContract',
    'lor',
    'viewlor',
    'wiki',
    'createWiki',
    'editWiki',
    'viewWiki',
    'reEditWiki',
    'forum',
    'Result',
    'dashboard/problemRefining',
    'dashboard/problemRefiningpost',
    'postdetail',
    'dataproviderreq',
    'DataProviderProblemInvolved'
    'DataProviderFeed',
    'tree',
    'viewTemplate',
    'list',
    'testing1',
    "companyAuth/:a/:code",
    "dashboard/communityList",
    "dashboard/community",
    "updateCompany",
    "dashboard/DataProviderProblemInvolved",
    'dashboard/quotation',
]

IS_CI = os.environ.get('IS_CI', False)
if not IS_CI:
    django_heroku.settings(locals())

# File Storage
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'hyadgtdv2',
    'API_KEY': '185496183979819',
    'API_SECRET': 'bhi1Md8ehOB8RQf_eT0XZQOdenQ',
    # 'STATICFILES_MANIFEST_ROOT': os.path.join(BASE_DIR, 'my-manifest-directory')
}
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'


# comment this line while working on local
del DATABASES['default']['OPTIONS']['sslmode']


# python manage.py makemigrations api chat comments forum lor monitorsolution post prototypetest smartcontract solutions updateapi users wiki helper communitychannel
