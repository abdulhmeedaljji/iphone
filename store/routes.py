
from store import app,mail
from flask import render_template,request,jsonify,send_from_directory,json,session,url_for
from store import db
from store.models import Products,Titles1,Titles3
from flask_mail import Message

newData2 = {
    'titles':['تصفح','شراء الآن','اسم المتجر']
}
@app.route('/store')
def store_page():
    return render_template('store.html')

@app.route('/form')
def form_page():
    return render_template('form.html',items2=db.session.query(Titles1).first())

@app.route('/payment')
def payment_page():
    return render_template('payment.html',items = db.session.query(Titles3).first())

@app.route('/')
def home_page():
    product = request.args.get('product')
    if product != None and product != 'None':
        products = Products.query.filter_by(id=product)
        return render_template('products.html',items=Products.query.all(),items1 = products)
    else:
        return render_template('store.html',items=Products.query.all(),items2=db.session.query(Titles1).first())

@app.route('/sendMail/')
def mail_page():
    msg = Message('عملية دفع جديدة',sender = 'noreply@demo.com',recipients = ['2odabahaa@gmail.com'])
    msg.body = f''' 
    {request.args.get('message')}
    '''
    mail.send(msg)

@app.route('/controlPanel/products')
def products_panel():
    db.create_all()
    num_items = db.session.query(Titles1).count()
    if num_items == 0:
        db.session.add(Titles1(name = 'اسم المتجر',buy = 'صفحة المنتج',browse = 'تصفح'))
        db.session.commit()
    num_items = db.session.query(Titles3).count()
    if num_items == 0:
        db.session.add(Titles3(name = 'نص',buy = '2.jpeg',browse = 'الدفعة الأولى'))
        db.session.commit()
    products = Products.query.all()
    return render_template('cpanel.html',items=products)

@app.route('/controlPanel/products/add/')
def products_add():
    name = request.args.get('name')
    date = request.args.get('date')
    img = request.args.get('img')
    desc = request.args.get('desc')
    price = request.args.get('price')
    spec = request.args.get('spec')
    quote = request.args.get('quote')
    db.session.add(Products(name=name,date=date,desc=desc,price=price,spec=spec,quote=quote,img= f'/static/images/{img}'))
    db.session.commit()

@app.route('/controlPanel/products/edit/')
def products_edit():
    name = request.args.get('name')
    date = request.args.get('date')
    img = request.args.get('img')
    desc = request.args.get('desc')
    price = request.args.get('price')
    spec = request.args.get('spec')
    quote = request.args.get('quote')
    ind = request.args.get('ind')
    if name!='':
        db.session.query(Products).filter(Products.id == ind).update({Products.name: name})
        db.session.commit()
    if date!='':
        db.session.query(Products).filter(Products.id == ind).update({Products.date: date})
        db.session.commit()
    if desc!='':
        db.session.query(Products).filter(Products.id == ind).update({Products.desc: desc})
        db.session.commit()
    if price!='':
        db.session.query(Products).filter(Products.id == ind).update({Products.price: price})
        db.session.commit()
    if img!='undefined' and img!='':
        db.session.query(Products).filter(Products.id == ind).update({Products.img: f'/static/images/{img}'})
        db.session.commit()
    if spec!='':
        db.session.query(Products).filter(Products.id == ind).update({Products.spec: spec})
        db.session.commit()
    if quote!='':
        db.session.query(Products).filter(Products.id == ind).update({Products.quote: quote})
        db.session.commit()

@app.route('/controlPanel/products/del/')
def products_del():
    ind = request.args.get('ind')
    db.session.query(Products).filter(Products.id==ind).delete()
    db.session.commit()

@app.route('/controlPanel/products/favon/')
def products_favon():
    ind = request.args.get('ind')
    if db.session.query(Products).filter(Products.fav == 'true').count() <= 4:
        db.session.query(Products).filter(Products.id == ind).update({Products.fav: 'true'})
        db.session.commit()
        return 'true'
    else:
        return 'false'

@app.route('/controlPanel/products/favoff/')
def products_favoff():
    ind = request.args.get('ind')
    db.session.query(Products).filter(Products.id == ind).update({Products.fav: 'false'})
    db.session.commit()

@app.route('/controlPanel/products/search/')
def products_search():
    ind = request.args.get('ind')
    return render_template('search.html',items = Products.query.all(),search=ind,items3=Titles1.query.first())

@app.route('/controlPanel/titles/add/')
def titles_panel_add():
    name = request.args.get('name')
    buy = request.args.get('buy')
    if name != None and name!= 'undefined':
        db.session.query(Titles1).one().name = name
        db.session.commit()
    if buy != None and buy!= 'undefined':
        db.session.query(Titles1).one().buy = buy
        db.session.commit()
    

@app.route('/controlPanel/titles/')
def titles_panel():
    return render_template('titles.html',items = db.session.query(Titles1).first())

@app.route('/controlPanel/titles2/add/')
def titles_panel_add2():
    name = request.args.get('name')
    buy = request.args.get('buy')
    browse = request.args.get('browse')
    if name != None and name!= 'undefined':
        db.session.query(Titles3).one().name = name
        db.session.commit()
    if buy != None and buy!= 'undefined':
        db.session.query(Titles3).one().buy = buy
        db.session.commit()
    if browse != None and browse!= 'undefined':
        db.session.query(Titles3).one().browse = browse
        db.session.commit()
    

@app.route('/controlPanel/titles2/')
def titles_panel2():
    return render_template('titles2.html',items = db.session.query(Titles3).first())