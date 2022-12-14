from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from tool.views.dangdangcrawler.crawl import DangDangCrawler

class DangDangCrawlerPage(APIView):

    def get(self, request):
        data = request.GET
        re_type = data.get('type', 'page')
        if re_type == 'page':
            return render(request, 'tool/dangdangcrawler/index.html')
        else:
            return self.crawl()
        
    def crawl(self):
        ddc = DangDangCrawler()
        result = ddc.start()
        return Response(result)
