package pro.chukai.mybatis.mapper;

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

/**
 * Created by chukai on 2017/3/4.
 */
public interface BaseMapper<T> extends Mapper<T>, MySqlMapper<T> {
}
