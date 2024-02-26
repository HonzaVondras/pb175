# Generated by Django 5.0.2 on 2024-02-25 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('image', models.CharField(max_length=255)),
                ('menu_items', models.ManyToManyField(related_name='restaurants', to='menu.menuitem')),
            ],
        ),
    ]
