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


def test_us08_created_product_appears_in_list(product_api, product):
    """US-08 상품 등록 후 목록에 표시"""
    product_api.create(store=1, product=product)
    assert product in product_api.list_products(store=1)


def test_us08_duplicate_code_in_same_store_rejected(product_api, product):
    """US-08 같은 매장의 중복 상품 코드는 저장되지 않음"""
    product_api.create(store=1, product=product)
    before = product_api.list_products(store=1)
    product_api.create_rejected(store=1, product=product)
    assert product_api.list_products(store=1) == before


@pytest.mark.parametrize("quantity", [0, -1])
def test_us08_conversion_qty_zero_or_less_rejected(product_api, product, quantity):
    """US-08 0 이하 환산값은 저장되지 않음"""
    product["conversion_qty"] = quantity
    before = product_api.list_products(store=1)
    product_api.create_rejected(store=1, product=product)
    assert product_api.list_products(store=1) == before


def test_us08_other_store_cannot_see_products(product_api, product):
    """US-08 다른 매장은 상품을 볼 수 없음"""
    product_api.create(store=1, product=product)
    assert product not in product_api.list_products(store=2)


@pytest.mark.skip(reason="US-08 필수 입력값이 팀에서 결정되지 않음")
def test_us08_missing_required_field_rejected():
    """US-08 필수값 누락은 저장되지 않음"""


@pytest.mark.skip(reason="입고 확정 및 판독 기능과 API 계약이 아직 없음")
def test_us08_update_applies_only_to_later_confirmations():
    """US-08 수정값은 이후 확정에만 적용되고 판독 후보가 됨"""
