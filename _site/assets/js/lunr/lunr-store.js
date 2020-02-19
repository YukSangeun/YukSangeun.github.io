var store = [{
        "title": "Graph",
        "excerpt":"1. 그래프 설명 현실세계에서는 도로망, 지인관계, 링크관계 등의 연결고리들을 표현할 수 있다. 정의: 정점(vertex)과 간선(edge)의 집합 G(V,E) 정점: 노드(node)라고도 부른다. 간선: 유형에 따라 나뉜다. 두 정점을 이어주는 간선 자기자신을 이어주는 간선 방향이 있는 간선/ 없는 간선 - 방향이 있는 간선의 경우 사이클 발생 가능 가중치가 있는/ 없는 간선 DAG: 여러...","categories": ["Data Structure"],
        "tags": ["BFS","DFS","graph"],
        "url": "http://localhost:4000/data%20structure/graph/",
        "teaser":null},{
        "title": "BFS Algorithm",
        "excerpt":"BFS(Breadth First Search) - 너비 우선 탐색 탐색 모든 정점들을 특정 순서에 따라 방문하는 알고리즘 그래프의 구조를 알 수 있다. (bfs, dfs 알고리즘을 이용) BFS 시작점에 가까운 정점부터 순서대로 방문(모든 곳을 공평하게 조금씩 본다.) 즉 시작점을 0단계, 그 다음부터 1, 2, ..k..단계라고 할 때, k단계에 방문하는 정점들을 시작점으로부터 최단거리가 k라고...","categories": ["Algorithm"],
        "tags": ["BFS","graph"],
        "url": "http://localhost:4000/algorithm/bfs/",
        "teaser":null},{
        "title": "DFS Algorithm",
        "excerpt":"DFS(Depth First Search) - 깊이 우선 탐색 탐색 모든 정점들을 특정 순서에 따라 방문하는 알고리즘 그래프의 구조를 알 수 있다. (bfs, dfs 알고리즘을 이용) DFS는 그래프의 모든 정점을 발견하는 가장 단순하고 고전적인 방법 DFS 현재 정점에서 더 이상 다른 정점으로 이동할 수 없는 상태에 도달할 때까지 탐색 후 이전 정점으로...","categories": ["Algorithm"],
        "tags": ["DFS","graph"],
        "url": "http://localhost:4000/algorithm/dfs/",
        "teaser":null},{
        "title": "백준 1039번 교환",
        "excerpt":"문제 0으로 시작하지 않는 정수 N이 주어진다. 이때, M을 정수 N의 자릿수라고 했을 때, 다음과 같은 연산을 K번 수행한다. 1&lt;= i &lt; j &lt;= M인 i와 j를 고른다. 그 다음, i번 위치의 숫자와 j번 위치의 숫자를 바꾼다. 이때, 바꾼 수가 0으로 시작하면 안된다. 위의 연산을 K번 했을 때, 나올 수...","categories": ["Problem"],
        "tags": ["BFS","graph"],
        "url": "http://localhost:4000/problem/bfs-problem1/",
        "teaser":null},{
        "title": " DP(Dynamic Programming)",
        "excerpt":"DP(Dynamic Programming) - 동적 계획법 큰 문제를 작은 문제로 나눠서 푸는 기법을 의미하며, 참고로 알고리즘 이름과 의미는 별개이다. 특징 작은 문제들에 대해 계산한 값을 여러 번 사용할 수 있기 때문에 메모이제이션이 필요 점화식을 잘 세우는 것이 중요(식과 초기 값) 종류: 1차 배열 dp, 2차 배열 dp … (분할 정복과 차이:...","categories": ["Algorithm"],
        "tags": ["DP"],
        "url": "http://localhost:4000/algorithm/dp/",
        "teaser":null},{
        "title": "Binary Search(이진탐색/ 이분탐색)",
        "excerpt":"탐색에는 기본적으로 순차 탐색이 있으며, 이 방법은 순차적으로 모든 데이터를 체크하여 값을 찾아가며 시간복잡도가 O(N)이다. 반면, 이진 탐색은 탐색 범위를 절반씩 줄여가며 찾아가는 탐색 방법으로 시간복잡도가 O(logN)이다. point 이진탐색의 경우 탐색하고자 하는 배열이 정렬되어 있어야 한다. algorithm 헤더에 존재하는 sort함수를 사용하여 정렬을 수행하고 시간복잡도는 O(NlogN)이다. 진행 순서 arr[9] = {1,...","categories": ["Algorithm"],
        "tags": ["Binary Search"],
        "url": "http://localhost:4000/algorithm/binary-serach/",
        "teaser":null},{
        "title": "Parametric Search",
        "excerpt":"Binary Search를 응용한 방법이며, 기본적인 탐색 방법은 Binary Search와 비슷하다. 차이 알고리즘 탐색범위 수행 binary search 배열 값들을 기준으로 탐색 mid값과의 일치여부로 판단 parametric search 실수 범위에서 이진탐색 비교함수 사용하여 판단 parametric search은 주로 내가 원하는 조건을 만족하는 가장 알맞은 값을 특정한 오차범위 이내에서 알고자 할 때 사용한다. ex) y...","categories": ["Algorithm"],
        "tags": ["Binary Search"],
        "url": "http://localhost:4000/algorithm/parametric-search/",
        "teaser":null},{
        "title": "Dijkstra(다익스트라)",
        "excerpt":"다익스트라 알고리즘은 최단 경로 알고리즘(다익스트라, 벨만-포드, 플로이드) 중 하나이다. 이후 플로이드 알고리즘에 대한 글을 작성할 예정이며, 벨만-포드는 잘 사용되지 않으므로 넘어간다. 최단 경로 문제 주어진 두 정점을 연결하는 가장 짧은 경로의 길이를 찾는 문제 가중치가 없는 그래프의 경우 BFS로 찾기가 가능하다. 가중치가 있는 그래프 경우 dijkstra를 이용한다. 방향 그래프를 기준으로...","categories": ["Algorithm"],
        "tags": ["Graph"],
        "url": "http://localhost:4000/algorithm/dijkstra/",
        "teaser":null}]
