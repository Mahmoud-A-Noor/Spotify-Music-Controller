# Generated by Django 4.1 on 2022-09-11 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SpotifyToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(max_length=50, unique=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('refresh_token', models.CharField(max_length=200)),
                ('access_token', models.CharField(max_length=200)),
                ('token_type', models.CharField(max_length=50)),
                ('expires_in', models.DateTimeField()),
            ],
        ),
    ]
