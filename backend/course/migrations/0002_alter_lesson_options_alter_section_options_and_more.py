# Generated by Django 5.0.1 on 2024-04-26 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='lesson',
            options={'ordering': ['my_order'], 'verbose_name': 'Lessons', 'verbose_name_plural': 'Lessons'},
        ),
        migrations.AlterModelOptions(
            name='section',
            options={'ordering': ['my_order'], 'verbose_name': 'Sections', 'verbose_name_plural': 'Sections'},
        ),
        migrations.RenameField(
            model_name='lesson',
            old_name='long_description',
            new_name='text',
        ),
        migrations.RemoveField(
            model_name='lesson',
            name='short_description',
        ),
        migrations.AddField(
            model_name='lesson',
            name='my_order',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='lesson',
            name='preview_image',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/lessons'),
        ),
        migrations.AddField(
            model_name='section',
            name='my_order',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
