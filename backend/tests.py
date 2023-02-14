from fastapi.testclient import TestClient

from .main import app


client = TestClient(app)


def test_samples_list():
    response = client.get("/samples")
    assert response.status_code == 200
