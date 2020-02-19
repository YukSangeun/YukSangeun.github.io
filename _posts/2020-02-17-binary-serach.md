---
title: "Binary Search(이진탐색/ 이분탐색)"
excerpt: "탐색 범위를 절반씩 줄여가며 탐색하는 알고리즘"


categories:
  - Algorithm
tags:
  - Binary Search
last_modified_at: 2020-02-17T23:43:00
---
탐색에는 기본적으로 순차 탐색이 있으며, 이 방법은 순차적으로 모든 데이터를 체크하여 값을 찾아가며 시간복잡도가 O(N)이다.  
반면, 이진 탐색은 탐색 범위를 절반씩 줄여가며 찾아가는 탐색 방법으로 시간복잡도가 O(logN)이다.  
**point**  
- 이진탐색의 경우 탐색하고자 하는 배열이 정렬되어 있어야 한다.  
- **algorithm** 헤더에 존재하는 **sort함수**를 사용하여 정렬을 수행하고 시간복잡도는 O(NlogN)이다.    

진행 순서  
---------------- 
arr[9] = {1, 2, 3, 7, 9, 12, 21, 23, 37} 에서 4를 찾는 경우
* 순차 탐색 경우: arr[0]부터 arr[8]까지 4와 일치여부를 모두 검사한다.
* 이분 탐색 경우: 초기 범위의 start=arr[0], end=arr[8]로 지정 후 범위의 중간인 arr[4]를 찾는 값과 비교하여 범위를 재지정한다.

  
![이분 탐색 진행 순서](https://yuksangeun.github.io/assets/images/binarySearch.PNG){: .align-center}  

코드
----------------
이분 탐색은 일반 반복문 또는 재귀함수를 사용하여 나타낼 수 있다.  
1. 일반 반복문  

		  int BinarySerach(int arr[], int target) {
		       int start = 0;
		       int end = arr.length - 1;
		       int mid = (end + start) / 2;
		       while(end >= start) {	//start가 end보다 값이 작거나 같은 경우 반복
		            if( arr[mid] == target ) return mid;	//경우1: 배열에서 target 찾은 경우 위치 반환
		            else if( arr[mid] < target ) start = mid + 1;	//경우2: target이 배열 중간보다 오른쪽인 경우
		            else end = mid - 1;	//경우3: target이 배열 중간보다 왼쪽인 경우
		            mid = (end + start) / 2;	//탐색 범위 재조정했으므로 mid값 다시 찾기
		       }
		       return -1;	//경우4: 배열속에서 target 못 찾은 경우
		  }

2. 재귀함수 

		  int arr[];	//전역변수로 지정
		  int BinarySerach(int start, int end, int target) {
		       int mid = (end + start) / 2;
		       if(start > end) return -1;	//경우4: 배열속에서 target 못 찾은 경우
		       if( arr[mid] == target ) return mid;	//경우1: 배열에서 target 찾은 경우 위치 반환
		       else if( arr[mid] < target ) start = mid + 1;	//경우2: target이 배열 중간보다 오른쪽인 경우
		       else end = mid - 1;	//경우3: target이 배열 중간보다 왼쪽인 경우
		       
		       BinarySearch(arr, start, end, target);	//범위 재조정 후 재귀 호출
		  }

참고  
------------  
binarySearch 알고리즘은 실제로 **algorithm**헤더에 존재한다.  
사용이 많이 되므로 동작이 수행되는 방법을 알고 있는 것이 좋으며, 헤더에 존재하는 함수를 사용할 때와 직접 코드를 작성하여 사용하는 경우 둘 다 걸리는 시간이 똑같다.  


binarySearch 알고리즘의 일부를 살짝 수정하면 **하한선/상한선**을 찾아주는 알고리즘을 만들 수 있다.  
ex) 10 20 20 30 40 순으로 값이 배열되어 있을 때, target = 20이라 하자.  
하한선의 경우: 20이상을 처음 찾는 위치를 반환하며 이 경우 위치 1에 해당한다.  
상한선의 경우: 20을 초과하는 처음 위치를 반환하며 이 경우 위치 3에 해당한다.  
1. 하한선 코드 (lower_bound)  

		  int lower_bound(int arr[], int target) {
		       int start = 0;
		       int end = arr.length - 1;
		       while(start <= end) {
		            int mid = (start + end) / 2;
		            if(arr[mid] < target) start = mid + 1;
		            else end = mid - 1;
		       }
		       return end+1;
		  }

2. 상한선 코드 (upper_bound)  

		  int upper_bound(int arr[], int target) {
		       int start = 0;
		       int end = arr.length - 1;
		       while(start <= end) {
		            int mid = (start + end) / 2;
		            if(arr[mid] <= target) start = mid + 1;
		            else end = mid - 1;
		       }
		       return end+1;
		  }

upper_bound/ lower_bound 역시 **algorithm**헤더에 존재한다.  


binary_search(arr, arr+n, key);	반환형은 true/false  
upper_bound(arr, arr+n, key);  반환형은 iterator  
lower_bound(arr.begin(), arr.end(), key);  반환형은 iterator  
벡터인 경우 lower_bound와 같은 형식으로 작성하면 되고, 일반 배열인 경우 나머지와 같은 형식으로 작성하면 된다.  


반환형이 iterator인 경우 현재 위치가 배열에서 몇 번째 위치인지를 확인하기 위해서는 벡터인 경우 iterator-v.begin(), 배열인 경우 iterator-arr을 하면 된다.  
해당 위치에 있는 값을 출력하고 싶을 때는 printf("%d", *iterator); 와 같이 작성한다.  

**주의**  
항상 위 세가지 함수 모두 정렬을 한다음에 수행해야한다.