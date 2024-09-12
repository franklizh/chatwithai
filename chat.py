from openai import OpenAI

client = OpenAI(
    
    api_key="your api key",
    base_url="your api url"
)


user_question=input(":")

completion = client.chat.completions.create(
    model="gpt-3.5-turbo-1106",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": user_question}
    ],
    logprobs=True,
    
    stream=False  # 是否开启流式输出
)

# 非流式输出获取结果
print(completion.choices[0].message.content)
# 流式输出获取结果
# for chunk in completion:
#     print(chunk.choices[0].delta)
