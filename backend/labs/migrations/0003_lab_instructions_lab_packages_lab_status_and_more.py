# Generated by Django 5.1.3 on 2025-01-29 21:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('labs', '0002_lab_studentprogress_delete_labconfiguration'),
    ]

    operations = [
        migrations.AddField(
            model_name='lab',
            name='instructions',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AddField(
            model_name='lab',
            name='packages',
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name='lab',
            name='status',
            field=models.CharField(choices=[('DRAFT', 'Draft'), ('PUBLISHED', 'Published')], default='DRAFT', help_text='Indicates if the lab is published or still in draft.', max_length=20),
        ),
        migrations.AlterField(
            model_name='lab',
            name='description',
            field=models.TextField(blank=True, default=''),
        ),
    ]
