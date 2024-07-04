from rest_framework import serializers


class OrderHistorySerializer(serializers.Serializer):
    created_at = serializers.DateTimeField()
    user_identifier = serializers.CharField()
    user_name = serializers.CharField()
    organization = serializers.CharField()
    amount = serializers.FloatField()


class OrderHistorySerializerEntry(serializers.Serializer):
    class Meta:
        model = OrderHistorySerializer
        fields = "__all__"
