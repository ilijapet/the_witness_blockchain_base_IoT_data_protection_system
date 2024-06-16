from rest_framework.views import APIView
from rest_framework.response import Response as HTTPResponse
from utils.sc_interface import SCInterface

class BridgeView(APIView):
    
    def post(self, request):
        try:
            data = request.data
            value = {"data": data["data"], "signature": data["signature"], "public_key": data["public_key"]}
            contract = SCInterface()
            contract.sendInput(value)
            return HTTPResponse(status=200)
        except Exception as e:
            return HTTPResponse(status=500)