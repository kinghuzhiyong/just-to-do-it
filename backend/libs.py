from email.header import Header
from email.mime.text import MIMEText
import smtplib
from email.utils import formataddr
from smtplib import SMTP


# 处理字典中的 datetime 格式
def process_datetime(x: dict):
    x["createTime"] = x["createTime"].strftime("%Y/%m/%d")
    x["eta"] = x["eta"].strftime("%Y/%m/%d")
    return x


# 给指定的邮箱发送邮件
def send_email(expire_list, ontime_list):
    receivers = ["receivers@xx.com"]

    # 将OA账号处理成为邮箱的形式
    print("Start send emails.")

    # 发送者邮箱
    sender = 'YourEmailAddr'

    # 发送者的登陆用户名和密码
    user = 'YourEmailAddr'
    password = 'YourPassword'

    # 发送者邮箱的SMTP服务器地址
    smtpserver = 'SMTP server addr'

    the_list1 = list(map(
        lambda x: "<h3>到期时间: {0}</h3><p>{1}</p>".format(x["eta"], x["text"]), expire_list))
    the_list2 = list(map(
        lambda x: "<h3>到期时间: {0}</h3><p>{1}</p>".format(x["eta"], x["text"]), ontime_list))
    the_list1 = "".join(the_list1)
    the_list2 = "".join(the_list2)

    # 定制的邮件内容
    massage_applicant = """
        <div>
            <h1 style="text-align: center;color: blue;">~Just To Do IT~</h1>
            <h2 style="color: red;">以下的待办已过期, 请尽快处理!!!</h1>
            {0}
            <h2 style="color: green;">正在进行中:</h1>
            {1}
        </div>
    """.format(the_list1, the_list2)

    msg = MIMEText(massage_applicant, _subtype="html", _charset="utf-8")
    # 接收者的邮箱地址

    print("Send the email to ", receivers)

    for i in receivers:
        msg['To'] = Header(i, 'utf-8')

    # 构造纯文本邮件内容
    msg['From'] = formataddr(("测试人", user))
    msg['Subject'] = "测试邮件"

    try:
        smtp = smtplib.SMTP()  # 实例化SMTP对象
        smtp.connect(smtpserver, 25)  # （缺省）默认端口是25 也可以根据服务器进行设定
        smtp.login(user, password)  # 登陆smtp服务器
        # 如果没有权限2的用户就会报错，进行一下控制
        smtp.sendmail(sender, receivers, msg.as_string())  # 发送邮件 ，这里有三个参数
        smtp.quit()
    except:
        print("发送邮件失败")

    print("发送邮件成功")
