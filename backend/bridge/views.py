from rest_framework.response import Response
from rest_framework.views import APIView
from utils.protocol import WitnessProtocol
import base64
from rest_framework.response import Response as HTTPResponse

class BridgeView(APIView):
    
    def post(self, request):
        data = request.data
        for key, value in data.items():
            data[key] = base64.b64decode(value)
        decrypt = WitnessProtocol.decrypt_verifay(data["data"], data["signature"], data["public_key"])
        print(decrypt, "ilija")
        return HTTPResponse(status=200)