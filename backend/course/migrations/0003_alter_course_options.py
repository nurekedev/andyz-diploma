# Generated by Django 5.0.1 on 2024-04-06 10:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0002_section_slug'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='course',
            options={'ordering': ['-created_at'], 'verbose_name': 'Courses', 'verbose_name_plural': 'Courses'},
        ),
    ]