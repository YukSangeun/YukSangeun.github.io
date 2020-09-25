# python requests

**python에서 HTTP 요청** 보내는 모듈: **requests** 정리



**HTTP method**

POST(생성), GET(조회), PUT(수정), DELETE(삭제)

**GET vs POST** 

1. **GET**

   * **서버로부터 정보를 조회**하기 위해 설계된 메소드

   * 요청을 전송할 때 데이터를 body에 담지 않고, 쿼리스트링을 통해 전송 (URL의 끝에 ```?``` 과 함께 이름과 값으로 쌍을 이루는 요청 파라미터를 의미) (요청 파라미터가 여러개이면 ```&``` 로 연결)

   * 쿼리스트링을 사용하게 되면 URL에 조회 조건을 표시하기 때문에 특정 페이지를 링크하거나 북마크 가능

     > www.example-url.com/resources?name1=value1&name2=value2   

   * GET은 Idempotent(멱등)하게 설계됨 >>  동일한 연산을 여러번 수행하더라도 동일한 결과가 나타남
   * **서버에 동일한 요청을 여러번 전송하더라도 동일한 응답이 돌아와야 한다**. 이에 따라 **주로 조회를 할 때에 사용** ex. 웹페이지 열기. 게시글 읽기 등 조회

2. **POST** 

   * **리소스를 생성/변경**하기 위해 설계된 메소드
   * GET과 달리 전송해야할 데이터를 HTTP 메세지의 Body에 담아서 전송
   * Body는 길이 제한이 없어 대용량 데이터 전송이 가능
   * GET과 달리 데이터가 Body에 전송되고 내용이 눈에 보이지 않아 GET보다 보안적인 면에서 안전하다 생각할 수 있지만, 크롬개발자 도구, Fiddler와 같은 툴로 요청 내용 확인 가능하므로 민감 데이터 경우 암호화 전송 필요
   * **POST 요청 보낼 시, 요청 헤더의 Content-Type에 요청 데이터의 타입을 표시**
   * 데이터 타입을 표시하지 않으며 서버는 내용이나 URL에 포함된 리소스의 확장자명 등으로 데이터 타입을 유추.
   * POST는 Non-idempotent하게 설계됨 >> **서버에 동일한 요청을 여러 번 전송해도 응답이 항상 다를 수 있다**. 이에 따라 **서버의 상태나 데이터를 변경시킬 때** 사용 ex. 게시글 쓰기, 삭제
   * (참고) POST는 생성, 수정, 삭제에 사용할 수 있지만, **생성은 POST**, **수정은 PUT**, **삭제는 DELETE** 가 용도에 더 맞는 메소드



1. 기본 사용 방법

   ``` python
   import requests
   URL = 'http://www.tistory.com'
   response = requests.get(URL)
   response.status_code	# get 성공시 200
   response.text	# 전달받은 response 내용
   ```

   내용: www.tistory.com 이라는 주소로 GET 요청 보내기 > 서버에서 요청 처리 후 나에게 응답(response) > 200 상태 코드와 함께 전달 된 경우 정상적인 응답을 보내줬다는 의미 (OK) > 응답 내용은 위 경우 HTML코드

2. GET 요청할 때 parameter 전달법

   1. 직접 파라미터 넣어 보내기

      ```python
      import requests
      
      url = "http://www.naver.com?a=bbb&b=123"
      response = requests.get(url)
      ```

   2. dictionary 이용하기

      ```python
      import requests
      
      # get method에 params 인자값에 key:value 형식의 자료형을 넣어준다.
      paramDict = {
      	"a" : "bbb",
      	"b" : 123
      }
      url = "http://www.naver.com"
      
      response = requests.get(url, params = paramDict)
      ```

3. POST 요청할 때 data 전달법

   ```python
   # url주소에 파라미터를 넣지 않기 때문에 위 2번째 방법처럼 보내야 한다.
   # 다른점: get메소드에서는 params 인자를 이용하지만, post 메소드는 data인자를 사용
   import requests, json
   
   #paramDict = {
   datas = {
       "a" : "bbb",
       "b" : 123
   }
   url = "http://www.naver.com"
   
   #response = requests.get(url, params = paramDict)
   response = requests.post(url, data = json.dumps(datas))
   
   # 우리가 인지하고 있는 딕셔너리 구조를 유지하면서 문자열로 바꿔 전달해줘야 하는데. 
   # 이 기능을 해주는 모듈이 json이다.
   # json.dumps(dictionary) 
   ```

4. 그 밖에 옵션들

   ```python
   # 앞에서 params, data를 살펴봤다.
   # 이밖에도 다른 옵션들 존재 : headers, cookies, timeout 등등
   headers = {'Content-Type': 'application/json; charset=utf-8'}
   cookies = {'sessionKey: sessionValue'}
   timeout = 3
   
   response = requests.get(URL, headers = headers, cookies = cookies, timeout = timeout)
   ```

5. 응답(response) 객체

   ```python
   #요청(request)를 보내면 응답(response)를 받는다.
   # json response경우 딕셔너리 타입으로 변환하기 위해 res.json()을 사용하면 됨
   
   response = requests.get(URL).json() # response에 딕셔터리 타입으로 저장됨
   ```

   