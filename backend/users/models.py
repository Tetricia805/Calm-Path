from django.db import models

class UserProfile(models.Model):
	name = models.CharField(max_length=100)
	pronouns = models.CharField(max_length=50, blank=True)
	mood = models.CharField(max_length=10, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.name
