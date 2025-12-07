from django.db import models

# Create your models here.
class Photos(models.Model):
    link = models.TextField(verbose_name="Ссылка")

    class Meta:
        verbose_name = 'фотография'
        verbose_name_plural = 'Фотографии' 

class EstateTypes(models.Model):
    estate_type = models.TextField(verbose_name="Тип недвижимости")

    class Meta:
        verbose_name = 'тип'
        verbose_name_plural = 'Типажи' 

class EstateObjects(models.Model):
    sourse = models.CharField(max_length=256, verbose_name="Источник")
    photo_id = models.ForeignKey(Photos, on_delete=models.SET_NULL, verbose_name="ID фотографии", null=True)
    title = models.CharField(max_length=256, verbose_name="Заголовок объявления")
    description = models.TextField(verbose_name="Описание")
    address = models.CharField(max_length=256, verbose_name="Адрекс")
    latitude = models.FloatField(verbose_name="Широта")
    longitude = models.FloatField(verbose_name="Долгота")
    price = models.FloatField(verbose_name="Цена (в руб.)")
    area = models.FloatField(verbose_name="Площадь, кв. метры")
    floor = models.IntegerField(verbose_name="Этаж")
    floors_total = models.IntegerField(verbose_name="Всего этажей")
    estate_type = models.ForeignKey(EstateTypes, on_delete=models.SET_NULL, verbose_name="Тип недвижимости", null=True)
    link = models.TextField(verbose_name="Ссылка")
    updated_at = models.DateTimeField(verbose_name="Дата публикации")

    class Meta:
        verbose_name = 'недвижимость'
        verbose_name_plural = 'Недвижимости' 

