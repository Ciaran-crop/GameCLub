# Generated by Django 3.2.8 on 2022-11-24 06:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gameclub', '0003_alter_usergameinfo_last_play'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usergameinfo',
            name='last_play',
            field=models.DateField(auto_now=True),
        ),
    ]
