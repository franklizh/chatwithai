from openai import OpenAI

client = OpenAI(
    
    api_key="your api key",
    base_url="your api url"
)

# 初始化消息列表，包括系统信息
messages = [{"role": "system", "content": "You are a helpful assistant."}]

try:
    while True:
        # 从键盘读取用户输入的问题
        user_question = input("请输入你的问题 (按 Ctrl+C 结束对话): ")
        
        # 将用户输入添加到消息列表
        messages.append({"role": "user", "content": user_question})

        # 获取模型的回答
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=messages,
            logprobs=True,
            stream=False  # 关闭流式输出，获取完整的回复
        )

        # 打印模型的回复
        assistant_response = completion.choices[0].message.content
        print("助手: " + assistant_response)

        # 将助手的回复添加到消息列表，以便在后续对话中使用
        messages.append({"role": "assistant", "content": assistant_response})

except KeyboardInterrupt:
    print("\n对话已结束.")

