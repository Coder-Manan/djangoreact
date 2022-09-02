from django.db import models

# Create your models here.
class blog(models.Model):

    #fields
    sno = models.AutoField(primary_key=True)
    name = models.TextField()
    title = models.TextField()
    content = models.TextField()

    #will specify how name of object is displayed
    def __str__(self) -> str:
        return str(self.sno)