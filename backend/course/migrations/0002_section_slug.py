# Generated by Django 5.0.1 on 2024-03-18 11:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='section',
            name='slug',
            field=models.SlugField(default='fdsdfsd', unique=True),
            preserve_default=False,
        ),
    ]
