# Generated by Django 5.0.1 on 2024-02-03 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_customuser_last_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='last_name',
            field=models.CharField(max_length=255),
        ),
    ]
