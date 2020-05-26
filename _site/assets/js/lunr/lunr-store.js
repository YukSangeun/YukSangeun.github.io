var store = [{
        "title": "Graph",
        "excerpt":"그래프 설명 현실세계에서는 도로망, 지인관계, 링크관계 등의 연결고리들을 표현할 수 있다. 정의: 정점(vertex)과 간선(edge)의 집합 G(V,E) 정점: 노드(node)라고도 부른다. 간선: 유형에 따라 나뉜다. 두 정점을 이어주는 간선 자기자신을 이어주는 간선 방향이 있는 간선/ 없는 간선 - 방향이 있는 간선의 경우 사이클 발생 가능 가중치가 있는/ 없는 간선 DAG: 여러 유형의...","categories": ["Data Structure"],
        "tags": ["BFS","DFS","graph"],
        "url": "http://localhost:4000/data%20structure/graph/",
        "teaser":null},{
        "title": "BFS Algorithm",
        "excerpt":"BFS 알고리즘은 Breadth First Search의 약자로 너비 우선 탐색을 의미한다. 탐색 모든 정점들을 특정 순서에 따라 방문하는 알고리즘 그래프의 구조를 알 수 있다. (bfs, dfs 알고리즘을 이용) BFS(너비 우선 탐색) 시작점에 가까운 정점부터 순서대로 방문(모든 곳을 공평하게 조금씩 본다.) 즉 시작점을 0단계, 그 다음부터 1, 2, ..k..단계라고 할 때, k단계에...","categories": ["Algorithm"],
        "tags": ["BFS","graph"],
        "url": "http://localhost:4000/algorithm/bfs/",
        "teaser":null},{
        "title": "DFS Algorithm",
        "excerpt":"DFS는 Depth First Search의 약자로 깊이 우선 탐색을 의미한다. 탐색 모든 정점들을 특정 순서에 따라 방문하는 알고리즘 그래프의 구조를 알 수 있다. (bfs, dfs 알고리즘을 이용) DFS는 그래프의 모든 정점을 발견하는 가장 단순하고 고전적인 방법 DFS(깊이 우선 탐색) 현재 정점에서 더 이상 다른 정점으로 이동할 수 없는 상태에 도달할 때까지...","categories": ["Algorithm"],
        "tags": ["DFS","graph"],
        "url": "http://localhost:4000/algorithm/dfs/",
        "teaser":null},{
        "title": "백준 1039번 교환",
        "excerpt":"문제 0으로 시작하지 않는 정수 N이 주어진다. 이때, M을 정수 N의 자릿수라고 했을 때, 다음과 같은 연산을 K번 수행한다. 1&lt;= i &lt; j &lt;= M인 i와 j를 고른다. 그 다음, i번 위치의 숫자와 j번 위치의 숫자를 바꾼다. 이때, 바꾼 수가 0으로 시작하면 안된다. 위의 연산을 K번 했을 때, 나올 수...","categories": ["Problem"],
        "tags": ["BFS","graph"],
        "url": "http://localhost:4000/problem/bfs-problem1/",
        "teaser":null},{
        "title": " DP(Dynamic Programming)",
        "excerpt":"DP(Dynamic Programming, 동적 계획법) 큰 문제를 작은 문제로 나눠서 푸는 기법을 의미하며, 참고로 알고리즘 이름과 의미는 별개이다. DP 작은 문제들에 대해 계산한 값을 여러 번 사용할 수 있기 때문에 메모이제이션이 필요 점화식을 잘 세우는 것이 중요(식과 초기 값) 종류: 1차 배열 dp, 2차 배열 dp … (분할 정복과 차이: 분할...","categories": ["Algorithm"],
        "tags": ["DP"],
        "url": "http://localhost:4000/algorithm/dp/",
        "teaser":null},{
        "title": "Binary Search(이진탐색/ 이분탐색)",
        "excerpt":"탐색에는 기본적으로 순차 탐색이 있으며, 이 방법은 순차적으로 모든 데이터를 체크하여 값을 찾아가며 시간복잡도가 O(N)이다. 반면, 이진 탐색은 탐색 범위를 절반씩 줄여가며 찾아가는 탐색 방법으로 시간복잡도가 O(logN)이다. point 이진탐색의 경우 탐색하고자 하는 배열이 정렬되어 있어야 한다. algorithm 헤더에 존재하는 sort함수를 사용하여 정렬을 수행하고 시간복잡도는 O(NlogN)이다. 진행 순서 arr[9] = {1,...","categories": ["Algorithm"],
        "tags": ["Binary Search"],
        "url": "http://localhost:4000/algorithm/binary-serach/",
        "teaser":null},{
        "title": "Parametric Search",
        "excerpt":"Binary Search를 응용한 방법이며, 기본적인 탐색 방법은 Binary Search와 비슷하다. Parametric Search 알고리즘 탐색범위 수행 binary search 배열 값들을 기준으로 탐색 mid값과의 일치여부로 판단 parametric search 실수 범위에서 이진탐색 비교함수 사용하여 판단 parametric search은 주로 내가 원하는 조건을 만족하는 가장 알맞은 값을 특정한 오차범위 이내에서 알고자 할 때 사용한다. ex)...","categories": ["Algorithm"],
        "tags": ["Binary Search"],
        "url": "http://localhost:4000/algorithm/parametric-search/",
        "teaser":null},{
        "title": "Dijkstra(다익스트라)",
        "excerpt":"다익스트라 알고리즘은 최단 경로 알고리즘(다익스트라, 벨만-포드, 플로이드) 중 하나이다. 이후 플로이드 알고리즘에 대한 글을 작성할 예정이며, 벨만-포드는 잘 사용되지 않으므로 넘어간다. 최단 경로 문제 주어진 두 정점을 연결하는 가장 짧은 경로의 길이를 찾는 문제 가중치가 없는 그래프의 경우 BFS로 찾기가 가능하다. 가중치가 있는 그래프 경우 dijkstra를 이용한다. 방향 그래프를 기준으로...","categories": ["Algorithm"],
        "tags": ["graph"],
        "url": "http://localhost:4000/algorithm/dijkstra/",
        "teaser":null},{
        "title": "Floyd(플로이드)",
        "excerpt":"최단 경로를 구하는 알고리즘 중 하나로 모든 쌍 최단 거리 알고리즘에 속한다. 모든 쌍 최단 거리 알고리즘은 말 그대로 모든 정점 쌍에 대한 최단 거리를 계산하는 것이다. 가장 간단한 방법으로는 다익스트라를 이용하는 방법이 있다. 즉 각 정점을 시작점으로 하여 다익스트라 알고리즘을 수행하는데 이때 다익스트라를 모든 정점에 대해서 수행한다. 시간 복잡도는...","categories": ["Algorithm"],
        "tags": ["graph"],
        "url": "http://localhost:4000/algorithm/floyd/",
        "teaser":null},{
        "title": "LCS(최장 공통 부분 수열)",
        "excerpt":"이전 포스트에서 DP에 대해 설명한 글이 있다. LCS는 DP를 기반으로 하여 최장 공통 부분 수열을 찾는 알고리즘이다. LCS(Longest Common Subsequence, 최장 공통 부분 수열) LCS란 가장 긴 공통 Subsequence를 찾는 알고리즘으로 이때 substring 과 구분해야한다. Substring이란 연속된 부분 문자열을 의미하며, Subsequence란 연속적이지 않은 부분 문자열을 의미한다. 아래 표를 통해 문자열...","categories": ["Algorithm"],
        "tags": ["DP"],
        "url": "http://localhost:4000/algorithm/LCS/",
        "teaser":null},{
        "title": "Greedy Algorithm(탐욕 알고리즘)",
        "excerpt":"답을 찾을 때 여러 개의 조각으로 쪼개고, 각 단계마다 답의 한 부분을 만들어 간다는 점에서 완전탐색이나 동적계획법과 동일하다. 차이   완전탐색, 동적계획법 모든 선택지를 고려해 보고 그 중 전체 답이 가장 좋은 것을 찾는다. 탐욕 알고리즘 미래를 생각하지 않고 지금 단계에서 가장 좋은 방법만을 선택한다. 사용 경우 탐욕법을 사용해도 항상...","categories": ["Algorithm"],
        "tags": ["greedy"],
        "url": "http://localhost:4000/algorithm/greedy-algorithm/",
        "teaser":null},{
        "title": "Knapsack Algorithm(배낭 알고리즘)",
        "excerpt":"(공부한 내용을 정리한 글로 부족하거나 틀린 부분이 존재할 수 있습니다.) 배낭 문제란 배낭에 물건을 담을 수 있는 무게의 최댓값이 존재하고 물건당 무게와 가치가 정해져 있을 때, 가치의 합이 최대가 되도록 물건들을 선택하여 배낭에 담는 문제이다. 배낭문제는 크게 두가지 유형이 존재한다. 물건을 나눠서 넣을 수 있는 경우 (fraction knapsack) 물건을 나눠서...","categories": ["Algorithm"],
        "tags": ["DP"],
        "url": "http://localhost:4000/algorithm/knapsack-algorithm/",
        "teaser":null},{
        "title": "백준 12865번 평범한 배낭",
        "excerpt":"문제 이 문제는 아주 평범한 배낭에 관한 문제이다. 한 달 후면 국가의 부름을 받게 되는 준서는 여행을 가려고 한다. 세상과의 단절을 슬퍼하며 최대한 즐기기 위한 여행이기 때문에, 가지고 다닐 배낭 또한 최대한 가치 있게 싸려고 한다. 준서가 여행에 필요하다고 생각하는 N개의 물건이 있다. 각 물건은 무게 W와 가치 V를 가지는데,...","categories": ["Problem"],
        "tags": ["DP"],
        "url": "http://localhost:4000/problem/knapsack-problem1/",
        "teaser":null},{
        "title": "백준 1162번: 도로포장",
        "excerpt":"문제 준영이는 매일 서울에서 포천까지 출퇴근을 한다. 하지만 잠이 많은 준영이는 늦잠을 자 포천에 늦게 도착하기 일쑤다. 돈이 많은 준영이는 고민 끝에 K개의 도로를 포장하여 서울에서 포천까지 가는 시간을 단축하려 한다. 문제는 N개의 도시가 주어지고 그 사이 도로들과 이 도로를 통과할 때 걸리는 시간이 주어졌을 때 최소 시간이 걸리도록 하는...","categories": ["Problem"],
        "tags": ["Dijkstra","graph"],
        "url": "http://localhost:4000/problem/dijkstra-problem1/",
        "teaser":null},{
        "title": "Segment Tree(세그먼트 트리)",
        "excerpt":"(공부한 내용을 기반으로 정리 용도로 작성한 글이므로 잘못된 부분이 있을 수 있습니다.) 한 배열(ex. A)의 부분 정보를 트리구조에 저장함으로서 O(logN)의 속도로 A 배열의 부분 정보를 빠르게 구할 수 있다. 이때, 부분 정보는 합 or 최댓값 or 최솟값 등 문제에 따라 다르다. 트리에 저장하는 방식을 예를 들어 살펴보자. 배열 A의 크기가...","categories": ["Algorithm"],
        "tags": ["Tree"],
        "url": "http://localhost:4000/algorithm/segment-tree/",
        "teaser":null},{
        "title": "Segment Tree with Lazy Propagation",
        "excerpt":"이전에 segment tree에 대해 공부했다. segment tree는 구간들의 정보를 저장하는 것으로 2개의 연산이 있다. update - 특정 인덱스의 값을 바꾸는 것 query - 특정 구간의 정보(합 or 곱 or 최댓값)을 구하는 것 추가로 Lazy propagation을 이용하면 특정 구간 [a, b]에 값 c를 동시에 더하는 연산도 가능하다. 특정 구간 [a, b]에...","categories": ["Algorithm"],
        "tags": ["Tree"],
        "url": "http://localhost:4000/algorithm/lazy-propagation/",
        "teaser":null},{
        "title": "백준 3653번: 영화 수집",
        "excerpt":"문제 상근이는 영화 DVD 수집가이다. 상근이는 그의 DVD 콜렉션을 쌓아 보관한다. 보고 싶은 영화가 있을 때는, DVD의 위치를 찾은 다음 쌓아놓은 콜렉션이 무너지지 않게 조심스럽게 DVD를 뺀다. 영화를 다 본 이후에는 가장 위에 놓는다. 상근이는 DVD가 매우 많기 때문에, 영화의 위치를 찾는데 시간이 너무 오래 걸린다. 각 DVD의 위치는, 찾으려는...","categories": ["Problem"],
        "tags": ["Tree"],
        "url": "http://localhost:4000/problem/segmentTree-problem1/",
        "teaser":null},{
        "title": "백준 6549번: 히스토그램에서 가장 큰 직사각형",
        "excerpt":"문제 히스토그램은 직사각형 여러 개가 아래쪽으로 정렬되어 있는 도형이다. 각 직사각형은 같은 너비를 가지고 있지만, 높이는 서로 다를 수도 있다. 예를 들어, 왼쪽 그림은 높이가 2, 1, 4, 5, 1, 3, 3이고 너비가 1인 직사각형으로 이루어진 히스토그램이다. (그림은 해당 페이지에 들어가서 볼 것) 히스토그램에서 가장 넓이가 큰 직사각형을 구하는 프로그램을...","categories": ["Problem"],
        "tags": ["Tree"],
        "url": "http://localhost:4000/problem/segmentTree-problem2/",
        "teaser":null},{
        "title": "백준 5419번: 북서풍",
        "excerpt":"문제 강한 북서풍이 불고 있다. 이 뜻은 동쪽과 남쪽 사이의 모든 방향으로 항해할 수 있다는 뜻이다. 북쪽이나 서쪽으로 항해하는 것은 불가능하다. 작은 섬이 여러 개 있는 바다가 있다. 섬은 좌표 평면의 한 점으로 나타낼 수 있다. y 좌표가 증가하는 방향은 북쪽, x좌표가 증가하는 방향은 동쪽이다. 북서풍을 타고 항해할 수 있는...","categories": ["Problem"],
        "tags": ["Tree"],
        "url": "http://localhost:4000/problem/segmentTree-problem3/",
        "teaser":null},{
        "title": "Capston: 딥러닝 기반 수화 교육 어플리케이션",
        "excerpt":"주제: 딥러닝을 이용한 수화 교육 어플리케이션 제작 기간: 2019.09. - 2019.12. 분류: 팀프로젝트 동기 기존에 존재하는 수화 학습용 어플리케이션들은 단순하게 사전적인 정보만을 전달하여 학습시 보조적인 역할만이 가능하다는 점에서 아쉬움을 느꼈다. 따라서 바쁜 사회에 어플리케이션만을 이용하여 능동적으로 학습할 수 있는 어플리케이션을 만들고자 했다. 카메라 인식을 기반으로 사용자의 손동작이 올바른 동작인지에 대한...","categories": ["Project"],
        "tags": ["Deep Learning"],
        "url": "http://localhost:4000/project/Capstone/",
        "teaser":null},{
        "title": "KMP(Knuth-Morris-Pratt) 알고리즘",
        "excerpt":"문자열 검색: 찾고자 하는 패턴의 문자를 본문 내용에서 어디에 있는지 확인하는 것 종류: 고지식한 검색 알고리즘, 라빈-카프(해시를 활용), KMP알고리즘, 보이어-무어 알고리즘 등 이중에서 KMP알고리즘에 대해 공부할 것이다. KMP 알고리즘은 문자열 A와 문자열 B가 있을 때, 문자열 A에서 문자열 B를 찾아주는 알고리즘으로 만든 사람 3명의 이름에서 앞 글자를 따서 KMP 알고리즘이라고...","categories": ["Algorithm"],
        "tags": ["String"],
        "url": "http://localhost:4000/algorithm/KMP/",
        "teaser":null},{
        "title": "백준 1786번: 찾기",
        "excerpt":"문제 백준 https://www.acmicpc.net/problem/1786 입력 첫째 줄에 문자열 T가, 둘째 줄에 문자열 P가 주어진다. 문자열 내에 공백이 포함되어 있을 수도 있음에 유의한다. 물론 공백도 하나의 문자로 인정된다. T와 P의 길이 n, m은 1이상 100만 이하이다. 참조 https://www.acmicpc.net/problem/1162 풀이 기본적인 KMP알고리즘을 이용한 문제이다. 코드 #include&lt;stdio.h&gt; #include&lt;vector&gt; using namespace std; char T[1000001], P[1000001];...","categories": ["Problem"],
        "tags": ["String","KMP"],
        "url": "http://localhost:4000/problem/KMP-problem1/",
        "teaser":null},{
        "title": "백준 1701번: Cubeditor",
        "excerpt":"문제 Cubelover는 프로그래밍 언어 Whitespace의 코딩을 도와주는 언어인 Cubelang을 만들었다. Cubelang을 이용해 코딩을 하다보니, 점점 이 언어에 맞는 새로운 에디터가 필요하게 되었다. 오랜 시간 고생한 끝에 새로운 에디터를 만들게 되었고, 그 에디터의 이름은 Cubeditor이다. 텍스트 에디터는 찾기 기능을 지원한다. 대부분의 에디터는 찾으려고 하는 문자열이 단 한 번만 나와도 찾는다. Cubelover는...","categories": ["Problem"],
        "tags": ["String","KMP"],
        "url": "http://localhost:4000/problem/KMP-problem2/",
        "teaser":null},{
        "title": "백준 4354번: 문자열 제곱",
        "excerpt":"문제 알파벳 소문자로 이루어진 두 문자열 a와 b가 주어졌을 때, ab는 두 문자열을 이어붙이는 것을 뜻한다. 예를 들어, a=”abc”, b=”def”일 때, ab=”abcdef”이다. 이러한 이어 붙이는 것을 곱셈으로 생각한다면, 음이 아닌 정수의 제곱도 정의할 수 있다. a^0 = “” (빈 문자열) a^(n+1) = a*(a^n) 문자열 s가 주어졌을 때, 어떤 문자열 a에...","categories": ["Problem"],
        "tags": ["String","KMP"],
        "url": "http://localhost:4000/problem/KMP-problem3/",
        "teaser":null},{
        "title": "백준 12851번 숨바꼭질 2",
        "excerpt":"문제 수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 1초 후에 2*X의 위치로 이동하게...","categories": ["Problem"],
        "tags": ["BFS","graph"],
        "url": "http://localhost:4000/problem/bfs-problem2/",
        "teaser":null},{
        "title": "백준 13460번 구슬 탈출 2",
        "excerpt":"문제 스타트링크에서 판매하는 어린이용 장난감 중에서 가장 인기가 많은 제품은 구슬 탈출이다. 구슬 탈출은 직사각형 보드에 빨간 구슬과 파란 구슬을 하나씩 넣은 다음, 빨간 구슬을 구멍을 통해 빼내는 게임이다. 보드의 세로 크기는 N, 가로 크기는 M이고, 편의상 1×1크기의 칸으로 나누어져 있다. 가장 바깥 행과 열은 모두 막혀져 있고, 보드에는 구멍이...","categories": ["Problem"],
        "tags": ["BFS","Brute-force"],
        "url": "http://localhost:4000/problem/bruteforce-problem1/",
        "teaser":null}]
