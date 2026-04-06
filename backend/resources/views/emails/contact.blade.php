<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Yeni Portfolyo Mesajı</title>
</head>
<body>
    <h2>Yeni Portfolyo Mesajı</h2>
    <p><strong>İsim:</strong> {{ $data['name'] }}</p>
    <p><strong>E-posta:</strong> {{ $data['email'] }}</p>
    <p><strong>Mesaj:</strong></p>
    <p>{{ $data['message'] }}</p>
</body>
</html>