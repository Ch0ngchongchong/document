import pytest


@pytest.fixture
def product_api():
    pytest.skip("US-08 API·인증 계약과 테스트 클라이언트 연결 필요")


@pytest.fixture
def product():
    return {
        "product_code": "P-0123",
        "name": "서울우유 1000ml",
        "spec": "1L",
        "base_unit": "개",
        "pack_unit": "박스",
        "conversion_qty": 10,
        "base_unit_price": 2650,
    }


def test_us08_상품_등록_후_목록에_표시(product_api, product):
    product_api.create(store=1, product=product)
    assert product in product_api.list_products(store=1)


def test_us08_같은_매장의_중복_상품_코드는_저장되지_않음(product_api, product):
    product_api.create(store=1, product=product)
    before = product_api.list_products(store=1)
    product_api.create_rejected(store=1, product=product)
    assert product_api.list_products(store=1) == before


@pytest.mark.parametrize("quantity", [0, -1])
def test_us08_0_이하_환산값은_저장되지_않음(product_api, product, quantity):
    product["conversion_qty"] = quantity
    before = product_api.list_products(store=1)
    product_api.create_rejected(store=1, product=product)
    assert product_api.list_products(store=1) == before


def test_us08_다른_매장은_상품을_볼_수_없음(product_api, product):
    product_api.create(store=1, product=product)
    assert product not in product_api.list_products(store=2)


@pytest.mark.skip(reason="US-08 필수 입력값이 팀에서 결정되지 않음")
def test_us08_필수값_누락은_저장되지_않음():
    pass


@pytest.mark.skip(reason="입고 확정 및 판독 기능과 API 계약이 아직 없음")
def test_us08_수정값은_이후_확정에만_적용되고_판독_후보가_됨():
    pass
