# Generated by Django 5.0.1 on 2024-04-26 18:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0003_remove_lesson_preview_image_remove_lesson_text_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lesson',
            name='yt_id',
        ),
    ]
