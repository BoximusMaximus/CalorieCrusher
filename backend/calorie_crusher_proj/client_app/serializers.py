from rest_framework import serializers

from .models import Client

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["id", "username", "email", "height", "weight", "target_weight"]
        read_only_fields = ["id"]