import urllib.request
import sys

url = "https://contribution.usercontent.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NGZjMTUwMjY3NTgwNjM5NGYxODUyM2MxNDkwEgsSBxDb-qX6kA0YAZIBIwoKcHJvamVjdF9pZBIVQhM2MjM0MTUwNTM4NDQyMTQyOTMy&filename=&opi=89354086"
output_path = "src/reference/stitch_code.html"

try:
    with urllib.request.urlopen(url, timeout=30) as response:
        content = response.read().decode('utf-8')
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(content)
    print(f"Successfully downloaded to {output_path}")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
