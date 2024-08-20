from rest_framework.response import Response as HTTPResponse
from rest_framework.views import APIView
from utils.sc_interface import SCInterface


class BridgeView(APIView):

    def __init__(self):
        self.contract = SCInterface()

    def post(self, request):
        try:
            data = request.data
            value = {
                "data": data["data"],
                "signature": data["signature"],
                "public_key": data["public_key"],
            }
            tx_hash = self.contract.sendInput(value)
            return HTTPResponse(status=200)
        except Exception as e:
            return HTTPResponse(status=500, data={"error": str(e)})
