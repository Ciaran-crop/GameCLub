from django.contrib import admin
from gameclub.models.user_profile import UserProfile
from gameclub.models.game import GameInfo
from gameclub.models.user_game import UserGameInfo
from gameclub.models.tools import Tool

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(GameInfo)
admin.site.register(UserGameInfo)
admin.site.register(Tool)
