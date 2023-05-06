# Generated by Django 4.2.1 on 2023-05-06 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sample',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('mode', models.CharField(choices=[('ONESHOT', 'oneshot'), ('START_STOP', 'start/stop')], max_length=50)),
                ('color', models.CharField(max_length=8)),
                ('file_url', models.URLField()),
                ('time_added', models.DateTimeField(auto_now_add=True)),
                ('clicks', models.IntegerField(default=0)),
            ],
        ),
    ]
