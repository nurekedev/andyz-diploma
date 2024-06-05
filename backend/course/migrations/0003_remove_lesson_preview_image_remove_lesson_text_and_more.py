# Generated by Django 5.0.1 on 2024-04-26 18:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0002_alter_lesson_options_alter_section_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lesson',
            name='preview_image',
        ),
        migrations.RemoveField(
            model_name='lesson',
            name='text',
        ),
        migrations.AddField(
            model_name='lesson',
            name='short_description',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.CreateModel(
            name='ArticleСontent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(blank=True)),
                ('photo', models.ImageField(blank=True, upload_to='article_photos/')),
                ('my_order', models.PositiveIntegerField(default=0)),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='contents', to='course.lesson')),
            ],
            options={
                'ordering': ['my_order'],
            },
        ),
        migrations.CreateModel(
            name='VideoContent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('yt_id', models.CharField(max_length=20)),
                ('description', models.TextField(blank=True)),
                ('my_order', models.PositiveIntegerField(default=0)),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='course.lesson')),
            ],
            options={
                'ordering': ['my_order'],
            },
        ),
    ]